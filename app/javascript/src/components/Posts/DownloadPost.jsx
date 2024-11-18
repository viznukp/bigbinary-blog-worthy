import React, { useState, useEffect } from "react";

import { Modal, ProgressBar } from "@bigbinary/neetoui";
import createConsumer from "channels/consumer";
import { subscribeToPostDownloadChannel } from "channels/PostDownloadChannel";

import postsApi from "apis/posts";

const DownloadPost = ({ slug, onDownloadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  const consumer = createConsumer();

  const saveAs = ({ blob, fileName }) => {
    const objectUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(objectUrl), 150);
    onDownloadComplete();
  };

  const downloadPdf = async () => {
    try {
      const data = await postsApi.download();
      saveAs({ blob: data, fileName: "post_pdf_report.pdf" });
    } catch (error) {
      logger.error(error);
    }
  };

  const generatePdf = async () => {
    try {
      await postsApi.generatePdf(slug);
    } catch (error) {
      logger.error(error);
    }
  };

  useEffect(() => {
    subscribeToPostDownloadChannel({
      consumer,
      setMessage,
      setProgress,
      generatePdf,
    });

    return () => {
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      downloadPdf();
    }
  }, [progress]);

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="px-12 py-16">
        <ProgressBar progressPercentage={progress} />
        {message}
      </div>
    </Modal>
  );
};

export default DownloadPost;
