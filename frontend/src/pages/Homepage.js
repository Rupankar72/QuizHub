import { React, useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Center,
  Stack,
  Link,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      navigate("/main");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontFamily="Work sans">
          <Center>Quiz <Text bg="#FF9900" borderRadius="15px">Hub</Text></Center>
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        mt={{ base: "10px", md: "50px" }}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Stack
          color="white"
          fontFamily="Work sans"
          fontWeight="bold"
          direction={"row"}
          spacing={6}
        >
          <Link href={"https://github.com/Rupankar72"} target="_blank">
            <img 
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
    alt="GitHub Logo" 
    style={{ width: "40px", height: "40px" }} 
  />

          </Link>
          <Link
            href={"https://www.linkedin.com/in/rupankar-das-509906203?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}
            target="_blank"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" 
       alt="LinkedIn Logo" 
       width="120" 
       height="30" />

          </Link>
          <Link
            href={"https://www.facebook.com/rupankar.das.7399?mibextid=rS40aB7S9Ucbxw6v"}
            target="_blank"
          >
            <img 
    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" 
    alt="Facebook Logo" 
    style={{ width: "40px", height: "40px" }} 
  />

          </Link>
        </Stack>
        <Text
          color="#000000"
          fontFamily="Work sans"
          fontWeight="bold"
          fontSize="16px"
        >
          <Text color="#000000" fontSize="14px">
          © {new Date().getFullYear()} Quiz Hub. All rights reserved.
        </Text>
        </Text>
      </Container>
    </Container>
  );
};

export default Homepage;
