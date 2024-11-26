"use client";

import { ArticleDetail } from "@/app/article/[id]/article-detail";
import { Modal } from "./modal";
import { ArticleData } from "@/app/page";
import { useState } from "react";

interface ModalArticleWrapperProps {
  data: ArticleData;
  userId?: number;
}

export const ModalArticleWrapper = ({ data, userId }: ModalArticleWrapperProps) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <Modal
      title={data.title}
      openModal={openModal}
      setOpenModal={setOpenModal}
      contentClassName='w-4/5 max-w-3xl max-h-[600px] sm:max-h-[800px] overflow-y-auto'
    >
      <ArticleDetail data={data} userId={userId} setOpenModal={setOpenModal} />
    </Modal>
  );
};
