import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import useMultipleUpload from "../../hooks/useMultipleUpload";
import { useEffect } from "react";

export type MultipleUploadType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSetFieldValue: any;
};
const MultipleUpload = ({ onSetFieldValue }: MultipleUploadType) => {
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

  useEffect(() => {
    const fileListBase64 = fileList.map((file) => {
      return file.url;
    });
    onSetFieldValue("images", fileListBase64);
  }, [fileList, fileList.length, onSetFieldValue]);
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
