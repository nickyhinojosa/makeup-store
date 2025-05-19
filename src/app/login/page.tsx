"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
  Input,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (attempts > 0 && attempts < 5) {
      toast.warn(`Te quedan ${5 - attempts} intento(s).`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          fontSize: '16px',
          backgroundColor: '#FFEB3B',
          color: '#000',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }
      });

    }

    if (attempts >= 5) {
      setBlocked(true);
      const unblockTime = 300; 
      setTimeLeft(unblockTime);
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      setTimeout(() => {
        setBlocked(false);
        setAttempts(0);
        setErrorMessage("");
        clearInterval(interval);
      }, unblockTime * 1000);

      setErrorMessage(`Límite alcanzado. Debe esperar 5 minutos para volver a intentar.`);
      return () => clearInterval(interval);
    }
  }, [attempts]);

  async function handleFormSubmit(ev: any) {
    ev.preventDefault();
    setErrorMessage(""); 

    if (blocked) {
      setErrorMessage(`Límite alcanzado. Debe esperar ${Math.ceil(timeLeft / 60)} minuto(s) y ${timeLeft % 60} segundo(s) para volver a intentar.`);
      return;
    }

    if (!usuario && !contrasena) {
      setErrorMessage("Por favor, ingrese el usuario y la contraseña.");
      return;
    }
    if (!usuario) {
      setErrorMessage("Por favor, ingrese el usuario.");
      return;
    }
    if (!contrasena) {
      setErrorMessage("Por favor, ingrese la contraseña.");
      return;
    }

    setLoginInProgress(true);

    try {
      const r = await signIn("credentials", {
        usuario,
        contrasena,
        redirect: false,
        callbackUrl: "/"

      });

      if (!r || r.error) {
        setErrorMessage("Usuario o contraseña incorrectos.");
        setUsuario("");
        setContrasena("");
        setAttempts(attempts + 1);
      } else {
        window.location.href = r.url || "/";
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Ocurrió un error al intentar iniciar sesión.");
    }

    setLoginInProgress(false);
  }

  return (
    <div className="relative flex justify-center items-center h-screen">
      <ToastContainer />
      <Card className="max-w-md w-full p-5 transform transition-all duration-300 hover:scale-105 bg-white rounded-lg">
        <CardHeader className="flex gap-3 items-center">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="/makeup.png"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-lg font-bold">Makeup your self</p>
            <p className="text-sm text-gray-500">Iniciar sesión</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-5 justify-center">
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <Input
            type="text"
            variant="bordered"
            label="Usuario"
            value={usuario}
            onChange={(e) => {
              setUsuario(e.currentTarget.value);
            }}
            disabled={blocked}
          />
          <Input
            type="password"
            variant="bordered"
            label="Contraseña"
            value={contrasena}
            onChange={(e) => {
              setContrasena(e.currentTarget.value);
            }}
            disabled={blocked}
          />
          {blocked && (
            <p className="text-red-500 text-sm text-center">Falta {Math.ceil(timeLeft / 60)} minuto(s) y {timeLeft % 60} segundo(s) para poder ingresar de nuevo.</p>
          )}
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center">
          <Button
            isLoading={loginInProgress}
            onClick={handleFormSubmit}
            className="w-40"
            color="primary"
            variant="shadow"
            disabled={blocked}
          >
            Iniciar
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;
