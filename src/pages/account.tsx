import { Container, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import UserAccountComponent from "../ui/components/UserAccountComponent/UserAccountComponent";
import { useSessionUserPage } from "data/services/hooks/PageHooks/SessionUserHook";
import { IUser } from "types/User";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "data/services/cookie";
import { serviceApi } from "data/services/ServiceApi";
import { toast } from "react-toastify";
import { LinkStyled } from "ui/components/Link/Link.style";
import { routeExit } from "data/utils/mock";

type Passwords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface AccountProps {
  user: IUser;
  token: string;
}

function Account({ user, token }: AccountProps) {
  serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const [hasEdit, setHasEdit] = useState(false);
  const [hasEditPassword, setHasEditPassword] = useState(false);
  const { editUser, editUserPassword } = useSessionUserPage();

  const [data, setData] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    picture: "",
  });

  const [passwords, setPasswords] = useState<Passwords>({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setData({ ...user });
  }, [user]);

  function checkPasswords() {
    return (
      passwords.newPassword === passwords.confirmNewPassword &&
      passwords.confirmNewPassword.length > 0
    );
  }

  return (
    <div style={{ backgroundColor:"#fbfbfb"}}>
      <Head>
        <title>Minha conta | Wave CRM</title>
      </Head>
      <Container>
        {data && (
          <UserAccountComponent
            user={data}
            setUser={(user) => setData(user)}
            onClick={() => setHasEdit(!hasEdit)}
            hasEdit={hasEdit}
            saveEdit={async (data) => {
              setHasEdit(false);
              editUser(data.id, data);
            }}
            password={passwords}
            setUserPassword={(passwords) => setPasswords(passwords)}
            onClickPassword={() => {
              setHasEditPassword(!hasEditPassword);
              setPasswords({
                oldPassword: "",
                newPassword: "",
                confirmNewPassword: "",
              });
            }}
            hasEditPassword={hasEditPassword}
            saveEditPassword={async (passwords) => {
              if (
                passwords?.oldPassword?.length >= 6 &&
                passwords.newPassword.length >= 6 &&
                passwords.confirmNewPassword.length >= 6
              ) {
                if (passwords.newPassword !== passwords.confirmNewPassword) {
                  setHasEditPassword(false);
                  await editUserPassword("", "");
                  return null;
                } else {
                  checkPasswords();
                  setHasEditPassword(false);
                  await editUserPassword(data.id, passwords);
                  setPasswords({
                    oldPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  });
                }
              } else {
                toast.warning(
                  "Preencha os campos corretamente, e tente novamente! "
                );
              }
            }}
          />
        )}      
        <div style={{display:"flex", justifyContent:"end"}}>
        <List sx={{ mt: 0 }} style={{display:"flex", justifyContent:"center", width:"80px", marginRight:"30px"}}>
        {routeExit.map((itemMenu, index) => (
          <LinkStyled href={itemMenu.link}>
          <ListItem
            button
            key={index}
            style={{display:"flex", justifyContent:"center", alignItems:"center",height:"30px", borderRadius:"8px", padding:"0", paddingLeft:"10px", gap:"2px"}}
          >
              <ListItemText
                primary={itemMenu.name}
              />
              <ListItemIcon
                sx={{
                  fontSize: "20px",
                  mb: 1,
                  minWidth: "40px",
                  
                }}
                style={{display:"flex", justifyContent:"space-around",alignItems: 'center', padding:"0"}}
              >
                <i className={`fa ${itemMenu.icon}`} style={{paddingTop: '25%', marginLeft: '15%'}}></i>
              </ListItemIcon>
          </ListItem>
            </LinkStyled>
        ))}
      </List>

        </div>

      </Container>
    </div>
  );
}
export default Account;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  resolvedUrl,
}): Promise<any> => {
  const data = parseCookies(req);
  let token: string = "";
  let user: any = {};

  Object.keys(data).find((key, i) => {
    if (key === "@target:token") {
      token = Object.values(data)[i];
    }
    if (key === "@target:user") {
      user = Object.values(data)[i];
    }
  });
  if (!token?.length && resolvedUrl !== "/login") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    try {
      serviceApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      await serviceApi.get("/auth/faw1efawe3f14aw8es3v6awer51xx3/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }

  if (user) {
    user = JSON.parse(user);
  }
  return {
    props: {
      user,
      token,
    },
  };
};
