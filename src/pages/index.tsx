import TodosComponent from "@/components/todos/TodosComponent";
import WithAuthComponent from "@/hooks/withAuth";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

function DefaultTranslationComponent() {
  const { t } = useTranslation("common");
  return (
    <>
      <h1>{t("key")}</h1>
      <TodosComponent />
    </>
  );
}

export default WithAuthComponent(DefaultTranslationComponent);

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || "en", ["common"])),
  },
});
