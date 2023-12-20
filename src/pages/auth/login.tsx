// pages/login.tsx
import { useTranslation } from "next-i18next";
import { signIn } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import { Button, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react";

export default function LoginPage() {
  const { t } = useTranslation("common");
  useEffect(() => {});

  const handleClickSignIn = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <Center>
      <Flex direction={"column"}>
        <Heading textAlign="center">{t("ready-to-start")}</Heading>
        <Button onClick={handleClickSignIn}>{t("sign-in")}</Button>
      </Flex>
    </Center>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "en", ["common"])),
  },
});
