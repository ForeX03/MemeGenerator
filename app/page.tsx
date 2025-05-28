"use client";
import { FormEvent, useRef, useState } from "react";

export default function Home() {

  const [ imgSrc, setImgSrc ] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fileRef.current || fileRef.current.files == null) {
        return;
    }

    if (!textRef.current) {
        return;
    }

    const file = fileRef.current.files[0];
    const text = textRef.current.value;

    const reader = new FileReader();

    reader.onloadend = async () => {
        const base64 = reader.result;

        const res = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({text: text, img: base64}),
            headers: { 'Content-Type': 'application/json' },
        });

        const blob = await res.blob();

        setImgSrc(URL.createObjectURL(blob));
    }

    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-row bg-slate-700 w-full h-full">
        <div className="flex-grow flex flex-col items-center justify-center">
            {imgSrc != "" ?
                <>
                    <img className="h-1/2" src={imgSrc} />
                    <a className="m-2 p-2 bg-slate-800 text-gray-200 rounded-md" href={imgSrc} download={"generated.png"}>Pobierz obraz</a>
                </>
                :
                <p>
                  Nie stworzono jeszcze obrazu
                </p>
            }
        </div>
      <form method="POST" onSubmit={handleSubmit} className="flex flex-col w-96 bg-slate-800 p-5">
        <input className="p-2 rounded-md bg-slate-900 text-gray-400 m-2" ref={textRef} type="text" placeholder="Tekst" name="text" required={true}  />
        <input className="p-2 rounded-md bg-slate-900 text-gray-400 m-2" ref={fileRef} type="file" name="img" required={true} accept="image/png" />
        <input className="p-2 rounded-md bg-slate-900 text-gray-200 m-2" type="submit" value="Create" />
      </form>
    </div>
  );
}
