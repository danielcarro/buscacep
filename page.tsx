'use client'

import React, { useState, useEffect } from 'react';

interface Endereco {
  logradouro: string;
  localidade: string;
  uf: string;
}



const Page: React.FC = () => {
  const [cep, setCep] = useState<string>('');
  const [cepSan, setCepSan] = useState<string>('');
  const [endereco, setEndereco] = useState<Endereco | null>(null);


  const sanitizeCep = (cep: string) => {
    const sanitizedCep = cep.replace(/ /g, '').replace(/-/g, '');
    return sanitizedCep;
  };


  useEffect(() => {
    setCepSan(sanitizeCep(cep));
  }, [cep]);

  useEffect(() => {
    if (cep.length === 8) {
      buscarEndereco();
    }
  }, [cepSan]);


  const buscarEndereco = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepSan}/json`);
      const data = await response.json();
      setEndereco(data);
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };



  return (
    <div>
      <form >
        <input type="text" value={cep} onChange={handleCepChange} placeholder="Digite o CEP" />
       
      </form>
      {endereco && (
        <div>
          <h2>Endereço</h2>
          <p>Logradouro: {endereco.logradouro}</p>
          <p>Localidade: {endereco.localidade}</p>
          <p>UF: {endereco.uf}</p>
        </div>
      )}
    </div>
  );
};

export default Page;
