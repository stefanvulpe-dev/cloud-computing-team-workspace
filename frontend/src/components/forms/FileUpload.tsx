import { InputGroup, Text } from '@chakra-ui/react';
import { ReactNode, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type FileUploadProps = {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
};

export const FileUpload = (props: FileUploadProps) => {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, onChange, ...rest } = register as {
    ref: (instance: HTMLInputElement | null) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} gap={2} alignItems={'center'}>
      <input
        type={'file'}
        multiple={multiple || false}
        hidden
        accept={accept}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        onChange={(e) => {
          let fileName = e.target.files?.[0]?.name || null;

          if (fileName && fileName.length > 20) {
            fileName = `${fileName.substring(0, 20)}...${fileName.substring(
              fileName.length - 10,
            )}`;
          }

          setFileName(fileName);

          onChange(e);
        }}
        {...rest}
      />
      <>{children}</>
      <Text>{fileName}</Text>
    </InputGroup>
  );
};
