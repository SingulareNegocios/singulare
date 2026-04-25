'use client'
import { createContact } from "@/actions/contact";
import { useState } from "react";
import { useToast } from "@/components/use-toast";
import { title } from "process";

export function ContactForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("entou")

    const form = new FormData()

    form.append('username', name);
    form.append('email', email);
    form.append('phone', phone);
    form.append('message', message);

   const {response} = JSON.parse(await createContact(form));
 

   if(!response){
 
    toast({
        title: "Não foi possivel enviar o contato"
    })
   }else{

    toast({
        title: "Contato enviado com sucesso"
    })

    setName("")
    setEmail("")
    setPhone("")
    setMessage("")
   }
    
  };

  return (
    <div className="flex flex-col items-center bg-cinzaCarvao text-white py-16">
      
      <h1 className="text-2xl font-bold mb-8">
        ENTRE EM CONTATO CONOSCO
      </h1>

      <form className="flex gap-6">
        
        
        <div className="flex flex-col gap-4 [&>input]:w-[450px] [&>input]:h-[54px] [&>input]:rounded-lg [&>input]:px-4 [&>input]:text-black [&>input]:outline-none">
          <input
            placeholder="Insira aqui seu nome *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Insira aqui seu endereço de e-mail *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Insira aqui seu telefone *"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div> 

       
        <textarea
          placeholder="Insira aqui sua mensagem *"
           value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[450px] h-full rounded-lg p-4 text-black outline-none resize-none overflow-none"
        />
      </form>

     
      <button   onClick={handleSubmit}  className="mt-8 bg-cloudDancer text-black px-8 py-3 rounded-lg font-semibold hover:bg-brancoGelo transition">
        ENVIAR MENSAGEM
      </button>
    </div>
  );
}