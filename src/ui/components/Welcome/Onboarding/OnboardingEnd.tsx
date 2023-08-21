import Link from "next/dist/client/link";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import Welcomes from "../welcome";
import { ImageContainer } from "../welcome.style";
import { Random } from "../Random";
import Title from "ui/components/Title/Title";
import { FaRegEdit } from "react-icons/fa";
import { SubtitleStyled } from "ui/components/Title/Title.style";

export function Onboarding1(){
  return(
      
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Cadastre seus contatos e negociações"}
      subtitle={<p>Na tela principal você cadastra contatos e negociações, basta clicar nos botões <b>Novo contato</b> e <b>Criar negociação</b>.<br/> Registre suas tarefas, insignts e feedbacks clicando em <b>Nova Atividade</b> dentro das negociações </p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/1.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding2(){
  return(
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Crie funis de vendas"}
      subtitle={<p>Você pode criar mais de um funil de vendas, inclusive utilizar modelos prontos que fornecemos. <br/>Adicione etapas clicando em <b>Adicionar Pipeline</b> e edite clicando em  "<FaRegEdit/>" na etapa já criada.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/2.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding3(){
  return(
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Canais de vendas e Contatos"}
      subtitle={<p>Ao criar um <b>Contato</b>, você o atribui a um <b>Canal de venda </b>(de onde o contato veio), assim você organiza seus contatos por canal.<br/>Gerencie seus contatos e canais de vendas na tela de <b>Contatos</b> e <b>Canais</b>.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/3.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding4(){
  return(
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"DashBoards e B.I."}
      subtitle={<p>Na tela de DashBoards, você verifica todos os números de sua equipe,<br/> além de obter métricas importantes para <b>saúde comercial </b>do seu negócio.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/4.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding5(){
  return(
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Crie usuários"}
      subtitle={<p>Quando um usuário é criado, é enviado automaticamente a primeira senha de acesso para o e-mail cadastrado.<br/> Recomendamos que seja feita a <b>alteração de senha</b> após o primeiro contato com o sistema, sua senha permanecerá privada.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/5.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding6(){
  return(
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Finalizadas"}
      subtitle={<p>
        Visualize suas negociações concluídas na tela de Finalizadas, lá você terá todas informações sobre os dados de suas negociações.<br/> Para retomar uma negociação basta seleciona-la e clicar em " <i className="fa fa-refresh" aria-hidden="true"></i> Retomar negociação " nos detalhes da negociação.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/6.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}

export function Onboarding7(){
  return(
      
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Em qualquer lugar"}
      subtitle={<p>Você pode utilizar o Wave em seu celular, basta acessar pelo navegador do seu dispositivo.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/7.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}
export function Onboarding8(){
  return(
      
  <div style={{ margin: "auto",  marginTop: "20px" }}>
    <Title
      title={"Automatize seus processos"}
      subtitle={<p>Em <b>"Automações" </b>você pode registrar tarefas ou enviar e-mails automaticamente <br/> quando mover negociações entre etapas. Fique de olho para o lançamento de novas automações.</p>}
    ></Title>
    <ImageContainer>
      <img
        src={"OnboardingItems/10.svg"}
        alt="welcome"
        height="350px"
        width="auto"
        text-align="center"
        justify-content="center"
        align-items="center"
      />
    </ImageContainer>
  </div>
  )
}

export function OnboardingEnd(){
  return (
          <ImageContainer>
            <h1 style={{color:"#00e4a3"}}>Seja bem vindo!</h1>
            <SubtitleStyled>Clique em "Acessar a aplicação" para ir até o funil de vendas</SubtitleStyled>
            <ImageContainer>
              <img
                src={"OnboardingItems/8.svg"}
                alt="welcome"
                height="350px"
                width="auto"
                text-align="center"
                justify-content="center"
                align-items="center"
              />
            </ImageContainer>
            <div style={{ margin: "auto 0", marginTop: "20px" }}>
              <Link
                href={{
                  pathname: "/",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "200px", mt: 1 }}
                  color="primary"
                >
                  Acessar a aplicação
                </Button>
              </Link>
              </div>
          </ImageContainer>
  );
};
