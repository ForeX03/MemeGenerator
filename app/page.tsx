"use client";
import {FormEvent, useEffect, useRef, useState} from "react";

export default function Home() {

  const [ imgSrc, setImgSrc ] = useState("");
  const [ loading, setLoading ] = useState(true);

  const fileRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

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

        const imageSrc = await fetchImage(text, base64);
        setImgSrc(imageSrc);
        setLoading(false);
    }

    reader.readAsDataURL(file);
  }

  const fetchImage = async (text: string, img: string | ArrayBuffer | null) => {
      const res = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify({text: text, img: img}),
          headers: { 'Content-Type': 'application/json' },
      });
      const blob = await res.blob();

      return URL.createObjectURL(blob);
  }

  useEffect(() => {
      fetchImage("WASSUP", "https://meme.codebay.fun/default.png").then(url => {
          setImgSrc(url);
          setLoading(false);
      })
  }, [])

  return (
    <div className="flex flex-row bg-slate-700 w-full h-full">
        <div className="flex-grow flex flex-col items-center justify-center">
            {!loading ?
                <>
                    <img className="h-1/2" src={imgSrc} />
                    <a className="m-2 p-2 bg-slate-800 text-gray-200 rounded-md" href={imgSrc} download={"generated.png"}>Pobierz obraz</a>
                </>
                :
                <p>
                  Ładowanie
                </p>
            }
        </div>
      <form method="POST" onSubmit={handleSubmit} className="flex flex-col w-96 bg-slate-800 p-5">
        <input disabled={loading} className="p-2 rounded-md bg-slate-900 text-gray-400 m-2" ref={textRef} type="text" placeholder="Tekst" name="text" required={true}  />
        <input disabled={loading} className="p-2 rounded-md bg-slate-900 text-gray-400 m-2" ref={fileRef} type="file" name="img" required={true} accept="image/png" />
        <input disabled={loading} className="p-2 rounded-md bg-slate-900 text-gray-200 m-2 cursor-pointer active:bg-slate-950" type="submit" value="Create" />
      </form>
    </div>
  );
}
