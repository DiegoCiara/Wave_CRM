import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { navBarRoutes, navBarRoutesManager, navBarRoutesSecond } from "data/utils/mock";
import { getNameInitials } from "data/utils/nameConfig";
import { useRouter } from "next/dist/client/router";
import React, { useEffect } from "react";
import { LinkStyled } from "ui/components/Link/Link.style";
import theme from "ui/theme/theme";
import { HeaderLogoStyled, UserPictureStyled } from "../NavBar.style";
import { SubtitleStyled } from "ui/components/Title/Title.style";
import { BiGitPullRequest } from "react-icons/bi";
import { HiChartSquareBar } from "react-icons/hi";
import { FaAddressCard, FaUserFriends } from "react-icons/fa";
import { BsBarChartFill, BsCheckSquareFill, BsFillBuildingFill, BsFilter } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export const DrawerMobile = ({ isAdmin, navHover, user, ...props }) => {
  const [_navHover, setNavHover] = React.useState(false);
  const [userName, setUserName] = React.useState("N");

  const router = useRouter();

  useEffect(() => {
    setNavHover(navHover);
  }, [navHover]);

  useEffect(() => {
    setUserName(user?.name);
  }, [user]);

  return (
    <div
      style={{ 
        backgroundColor: theme.palette.secondary.dark, 
        height: "100vh", 
        maxHeight:"100vh", 
        display:'flex', 
        flexDirection:'column',  
        alignItems:"start",
        justifyContent: 'start', 
        width:"auto",
        maxWidth:"50vw"
      }}
    >        

    <List style={{ display:"flex", flexDirection:"column", height: '30px', marginTop:"10px", alignItems:"center", width:"100%"}}>
      <HeaderLogoStyled src={"favicon.svg"} alt={"Wave"} style={{ display:"flex", justifyContent:"space-around", width: '100%'}}/>

        <SubtitleStyled 
          style={{ display: "inline", fontSize:'10px', color: '#ffffff',  textAlign:"center"}}
          >Olá, {(userName)}!</SubtitleStyled>
    </List>    
    <div style={{marginTop:"50px", width:"100%", height:"auto", padding:"0"}}>
    <p style={{ display: "inline", marginLeft: '10px', color: '#ffffff', fontSize: '10px', fontWeight: 300, marginBottom:"5px"}}>NEGÓCIOS</p>
      <div className="divisor" style={{ width:"100%", margin:"0" }}/>
      <List sx={{ mt: 0 }}>
      <LinkStyled href={'/'}>
        <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "16px",
                  color:
                    router.route === '/'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: .4,
                  minWidth: "30px",
                }}
              >
                <HiChartSquareBar style={{ fontSize:"25px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: "5px"
                }}
                style={{ display: "inline",fontSize: "8px" }}
                primary={'Pipelines'}
              />
          </ListItem>
      </LinkStyled>

      <LinkStyled href={'/contact'}>
        <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/contact'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "16px",
                  color:
                    router.route === '/contact'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: .4,
                  minWidth: "30px",
                  display:"flex",
                }}
                style={{display:"flex"}}
              >
                <FaAddressCard className={`fa`} style={{ marginLeft: '6%', fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/contact'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: "5px"
                }}
                style={{ display: "inline",fontSize: "8px" }}
                primary={'Contatos'}
              />
          </ListItem>
      </LinkStyled>
      </List>
      
      
    </div>
      <p style={{ display: "inline", marginLeft: '10px', color: '#ffffff', fontSize: '10px', fontWeight: 300, marginBottom:"5px"}}>GESTÃO</p>
      <div className="divisor" style={{ width:"100%", margin:"0" }}/>
      <List sx={{ mt: 0 }}>
      <div style={{ display: !isAdmin ? "none" : "", margin:"0"}}>
      <LinkStyled href={"/company"} >
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === "/company"
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
              display: !isAdmin ? "none" : ""
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "15px",
                  color:
                    router.route === "/company"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <BsFillBuildingFill style={{marginTop: '12%', marginLeft: '10%', fontSize:"18px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === "/company"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  // mb: "20px",
                }}
                style={{ display: "inline", fontSize: "12px", }}
                primary={"Canais"}
              />
          </ListItem>
            </LinkStyled>

        </div>

            <LinkStyled href={'/dashboard'}>
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/dashboard'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "16px",
                  color:
                    router.route === '/dashboard'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <BsBarChartFill style={{ marginLeft: '10%', fontSize:"16px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/dashboard'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: "28px",
                }}
                style={{ display: "inline", height: '0' }}
                primary={'Dashboards'}
              />
          </ListItem> 
            </LinkStyled>

            <LinkStyled href={'/completed'}>
        <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/completed'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "16px",
                  color:
                    router.route === '/completed'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: .4,
                  minWidth: "30px",
                  display:"flex",
                }}
                style={{display:"flex"}}
              >
                <BsCheckSquareFill className={`fa`} style={{ marginLeft: '10%', fontSize:"16px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/completed'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: "5px"
                }}
                style={{ display: "inline",fontSize: "8px" }}
                primary={'Finalizadas'}
              />
          </ListItem>
            </LinkStyled>

      </List>
        <p style={{ display: "inline", marginLeft: '10px', color: '#ffffff', fontSize: '10px', fontWeight: 300, marginBottom:"5px"}}>AJUSTES</p>
      <div className="divisor" style={{ width:"100%", margin:"0" }}/>
      <List sx={{ mt: 0 }} >
        
      <div style={{ display: !isAdmin ? "none" : "", margin:"0"}}>
      <LinkStyled href={'/mail'}>
        <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/mail'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "16px",
                  color:
                    router.route === '/mail'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: .4,
                  minWidth: "30px",
                  display:"flex",
                }}
                style={{display:"flex"}}
              >
                <MdEmail className={`fa`} style={{ marginLeft: '5%', fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/mail'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: "5px"
                }}
                style={{ display: "inline",fontSize: "8px" }}
                primary={'E-mails'}
              />
          </ListItem>
      </LinkStyled>
      </div>

        <div style={{ display: !isAdmin ? "none" : "", margin:"0"}}>
      <LinkStyled href={"/automation"} >
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === "/automation"
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
              display: !isAdmin ? "none" : ""
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "15px",
                  color:
                    router.route === "/automation"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <BiGitPullRequest style={{marginTop: '12%', marginLeft: '5%', fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === "/automation"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  // mb: "20px",
                }}
                style={{ display: "inline", fontSize: "12px", }}
                primary={"Automações"}
              />
          </ListItem>
            </LinkStyled>

        </div>
        <div style={{ display: !isAdmin ? "none" : "", margin:"0"}}>
      <LinkStyled href={"/funnel"} >
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === "/funnel"
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
              display: !isAdmin ? "none" : ""
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "15px",
                  color:
                    router.route === "/funnel"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <BsFilter style={{marginTop: '12%', fontSize:"25px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === "/funnel"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  // mb: "20px",
                }}
                style={{ display: "inline", fontSize: "12px", }}
                primary={"Funis"}
              />
          </ListItem>
            </LinkStyled>

        </div>
        <div style={{ display: !isAdmin ? "none" : "", margin:"0"}}>
      <LinkStyled href={"/user"} >
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === "/user"
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark,
              // paddingTop: "20px",
              display: !isAdmin ? "none" : ""
            }}
          >
              <ListItemIcon
                sx={{
                  fontSize: "15px",
                  color:
                    router.route === "/user"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <FaUserFriends style={{marginTop: '12%', marginLeft: '5%', fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === "/user"
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  // mb: "20px",
                }}
                style={{ display: "inline", fontSize: "12px", }}
                primary={"Usuários"}
              />
          </ListItem>
            </LinkStyled>

        </div>
            <LinkStyled href={'/account'} >
          <ListItem
            button
            style={{
              backgroundColor:
                router.route === '/account'
                  ? theme.palette.secondary.dark
                  : theme.palette.secondary.dark}}
          >
              <ListItemIcon
                sx={{
                  fontSize: "15px",
                  color:
                    router.route === '/account'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  mb: 0.5,
                  minWidth: "30px",
                  
                }}
                style={{alignItems: 'center'}}
              >
                <i className={`fa fa-gear`} style={{marginTop: '12%', marginLeft: '10%', fontSize:"20px"}}/>
              </ListItemIcon>
              <ListItemText
                sx={{
                  color:
                    router.route === '/account'
                      ? theme.palette.secondary.light
                      : theme.palette.text.disabled,
                  // mb: "20px",
                }}
                style={{ display: "inline", fontSize: "12px", }}
                primary={'Configurações'}
              />
          </ListItem>
            </LinkStyled>
      </List>
    </div>
  );
};
