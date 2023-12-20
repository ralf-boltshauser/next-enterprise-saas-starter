import { Flex, Button, Box, Text, Img, Spacer } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavbarComponent() {
  // get user image from session
  const { data: session } = useSession();
  // chakra ui navbar
  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Flex direction="row">
          {session?.user.image && (
            <>
              <Img
                src={session?.user.image}
                alt="user avatar"
                style={{ borderRadius: "50%", width: "30px" }}
                marginRight={3}
              />
            </>
          )}
          <Link href={"/"}>
            <Text fontSize="lg" fontWeight="bold">
              Logo
            </Text>
          </Link>
        </Flex>
        <Flex alignItems={"center"}>
          <Link href={"/auth/login"}>
            <Button colorScheme="teal">Log in</Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
