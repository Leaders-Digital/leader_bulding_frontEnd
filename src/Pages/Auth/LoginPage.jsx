/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {login as Login} from "../../API/Auth";
import {Controller, useForm} from "react-hook-form";
import CostumInput from "../../Components/Inputs/CostumInput";
import logo from "../../assets/logo_building.png";
import PasswordInput from "../../Components/Inputs/PasswordInput";
import {Icon} from "@iconify/react/dist/iconify.js";
import CostumButton from "../../Components/CostumButton";
import LogoAnimation from "../../Components/Animated/LogoAnimation";
import {UseAuth} from "../../Contexts/AuthContext";
import {toast} from "react-toastify";

const LoginPage = () => {

    const {login} = UseAuth();
    const [isLoading, setIsLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        },
        mode: "onChange"
    });
    const navigate = useNavigate();

    const OnSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await Login(data.email, data.password);
            console.log("Login", response);
            await login();
            setIsLoading(false)

        } catch (e) {
            setIsLoading(false)
            console.log("failed");
            let errorMessage = "Échec de la connexion";
            
            if (e.message) {
                errorMessage = e.message;
            } else if (e.response?.status === 401) {
                errorMessage = "Email ou mot de passe incorrect";
            } else if (e.response?.status === 404) {
                errorMessage = "Utilisateur non trouvé";
            } else if (e.response?.status >= 500) {
                errorMessage = "Erreur du serveur. Veuillez réessayer plus tard";
            }
            
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex flex-row h-full">
            <div className="flex-1 bg-GohstWhite p-4 flex flex-col justify-center items-center ">
                <div className=" rounded-2xl w-[735.36px] h-[670px] bg-white flex flex-col px-20 py-12 gap-">
                    <div className="h-44 mb-6 flex flex-row justify-center items-center">
                        {" "}
                        <img src={logo} alt="logo" className="h-[213px] w-[174px]"/>{" "}
                    </div>
                    <form onSubmit={handleSubmit(OnSubmit)} className="flex flex-col">
                        <div className="flex flex-col gap-6 pl-4">
                            <div className="mt-5 ">
                                <label htmlFor="email" className="font-medium">
                                    {" "}
                                    Adresse Email
                                </label>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "L'email est requis",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Format d'email invalide"
                                        }
                                    }}
                                    render={({field}) => (
                                        <CostumInput
                                            {...field}
                                            placeholder="E-mail"
                                            icon={Icon}
                                            iconName="hugeicons:mail-01"
                                            height="64px"
                                            width="500px"
                                            iconHeight="24px"
                                            iconWidth="24px"
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="font-medium mb-6">
                                    {" "}
                                    Mot de passe
                                </label>
                                <Controller
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Le mot de passe est requis"
                                    }}
                                    render={({field}) => (
                                        <PasswordInput
                                            {...field}
                                            placeholder="Mot de passe"
                                            height="64px"
                                            width="500px"
                                        />
                                    )}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row justify-center items-center mt-20 pr-8">
                            {" "}
                            <CostumButton
                                isLoading={isLoading}
                                height="56px"
                                width="418px"
                                text="Se connecter"
                                type="submit"
                                className={"mr-3"}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-[800px] bg-[#DADADA] p-4">
                {" "}
                <LogoAnimation/>
            </div>
        </div>
    );
};

export default LoginPage;
