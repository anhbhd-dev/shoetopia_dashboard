import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React from "react";
import useSingleUpload from "../../hooks/useSingleUpload";

const SingleUploadAvatar: React.FC = () => {
  const {
    image,
    previewOpen,
    previewImage,
    previewTitle,
    handleCancel,
    handlePreview,
    handleChange,
  } = useSingleUpload();
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
        fileList={image ? [image] : []}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
      >
        {image ? null : uploadButton}
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

export default SingleUploadAvatar;
