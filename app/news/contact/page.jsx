"use client";

import { useState } from "react";
import { toast } from "@/utils/toast";
import { useFormErrors } from "@/hooks/useFormErrors";
import { ErrorMessage } from "@/components/ErrorMessage";
import { fieldClass } from "@/utils/form";

import { Phone, Mail, Clock, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const { errors, clearField, clearErrors, handleResponse } = useFormErrors();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const body = {
      guestName: form.guestName.value,
      guestEmail: form.guestEmail.value,
      subject: form.subject.value,
      message: form.message.value,
    };

    try {
      setLoading(true);

      const response = await fetch("/api/news/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {

      if (data.errors) {
        handleResponse(data);
        return;
      }

        throw new Error(data.message || "Ocurrió un error.");
      }

      clearErrors();

      toast.success(
        "Mensaje enviado",
        "Te responderemos lo antes posible."
      );

      form.reset();

    } catch (error) {
      toast.error("Ha ocurrido un error", error.message);
    } finally {
      setLoading(false);
    }
  }  

  const inputStyles = "w-full py-3 focus:outline-none focus:border-blue-500";
  
  return (
    <>
      <div className="flex-1 flex items-center justify-center p-6 py-12 lg:py-24 min-h-screen flex-col">
        <div className="w-full max-w-5xl bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm">
          <div className="flex-[1.5] p-8 lg:p-12">
            <h2 className="text-3xl font-normal text-gray-800 mb-8">
              Escríbenos
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    name="guestName"
                    type="text"
                    placeholder="Nombre"
                    className={fieldClass(errors.guestName, inputStyles, "bottom")}
                    onChange={() => clearField("guestName")}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="guestName"
                  />
                </div>

                  <div>
                    <input
                      name="guestEmail"
                      type="email"
                      placeholder="Email"
                      className={fieldClass( errors.guestEmail, inputStyles, "bottom")}
                      onChange={() => clearField("guestEmail")}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="guestEmail"
                    />
                </div>
              </div>

              <div>
                <input
                  name="subject"
                  type="text"
                  placeholder="Asunto"
                  className={fieldClass(errors.subject, inputStyles, "bottom")}
                  onChange={() => clearField("subject")}
                />
                <ErrorMessage
                  errors={errors}
                  name="subject"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Mensaje"
                  rows={5}
                  className={fieldClass(errors.message, inputStyles, "bottom")}
                  onChange={() => clearField("message")}
                />
                <ErrorMessage
                  errors={errors}
                  name="message"
                />
              </div>

              <button
                type="submit"
                className="bg-green-800 hover:bg-green-700 text-white px-6 py-3 rounded-md flex items-center gap-2 cursor-pointer"
              >
                <Send size={16} />
                Enviar
              </button>
            </form>
          </div>

          <div className="flex-1 bg-green-800 p-8 lg:p-12 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-normal mb-10">Contactanos</h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-green-400/30 p-3 rounded-full">
                  <MapPin className="h-6 w-6"/>
                </div>
                <div>
                  <p className="font-bold">Dirección:</p>
                  <p className="text-blue-50 font-light">
                    La Vega, Rep. Dom., 41000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-400/30 p-3 rounded-full">
                   <Phone className="h-6 w-6"/>
                </div>
                <div>
                  <p className="font-bold">Teléfono:</p>
                  <p className="text-blue-50 font-light">+1 829-552-4400</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-400/30 p-3 rounded-full">
                   <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Email:</p>
                  <p className="text-blue-50 font-light">404news@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-400/30 p-3 rounded-full">
                   <Clock className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold">Servicios:</p>
                  <p className="text-blue-50 font-light">
                    Generalmente respondemos dentro de las 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
