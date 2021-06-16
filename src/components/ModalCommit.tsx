import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { isNil, not } from "ramda";
import { useState } from "react";

import { usePutReadmeMutation } from "../apis/githubApi";
import { useAppSelector } from "../hooks";
import useReadme from "../hooks/useReadme";
import selectors from "../redux/selectors";

const getDefaultMessage = () => {
  const today = new Date();
  const [year, month, date] = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ];
  return `Update on ${year}-${month < 10 ? `0${month}` : month}-${
    date < 10 ? `0${date}` : date
  }`;
};

type ModalCommitProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModalCommit(props: ModalCommitProps) {
  const { isOpen, onClose } = props;

  const toast = useToast();
  const [message, setMessage] = useState(getDefaultMessage());
  const [putReadme, { isLoading }] = usePutReadmeMutation();
  const rawReadme = useAppSelector(selectors.github.selectReadme);
  const user = useAppSelector(selectors.github.selectUser);
  const { readme } = useReadme();

  const isValidate = not(isNil(message));

  const resetMessage = () => setMessage(getDefaultMessage());
  const handleClose = () => {
    resetMessage();
    onClose();
  };
  const handleChange: InputProps["onChange"] = (e) =>
    setMessage(e.target.value);
  const handleSubmit = () => {
    if (!rawReadme || !user) return;

    putReadme({
      message,
      content: btoa(unescape(encodeURIComponent(readme))),
      sha: rawReadme?.sha,
      commiter: {
        name: user.login,
        email: user.email,
      },
    })
      .unwrap()
      .then((res) => {
        if (res.commit) {
          handleClose();
          toast({
            title: "Success Commit to personal README",
            status: "success",
            isClosable: true,
          });
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Commit to Personal README</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Commit Message</FormLabel>
            <Input
              value={message}
              placeholder="Commit Message"
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="red"
            mr={4}
            disabled={!isValidate || isLoading}
            isLoading={isLoading}
            onClick={handleSubmit}
          >
            Commit
          </Button>
          <Button disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalCommit;
