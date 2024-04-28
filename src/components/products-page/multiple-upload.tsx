import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React from "react";
import useMultipleUpload from "../../hooks/useMultipleUpload";

const MultipleUpload: React.FC = () => {
  const {
    fileList,
    previewOpen,
    previewImage,
    previewTitle,
    handleCancel,
    handlePreview,
    handleChange,
  } = useMultipleUpload();

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default MultipleUpload;
