"use client";

import { Button } from "@heroui/button";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Divider } from "@heroui/divider";

const ThumbnailInput = () => {
  return (
    <>
      <div className="w-full">
        <input
          type="file"
          name="thumbnail"
          id="thumbnail"
          accept="image/*"
          className="hidden"
        />

        <label htmlFor="thumbnail" className="block cursor-pointer w-full bg-gray-500 aspect-video">
        hhh
        </label>
      </div>
    </>
  );
};

// export default function NewPostModal() {
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//
//   return (
//     <>
//       <Button
//         color="primary"
//         variant="shadow"
//         className="fixed bottom-16 md:bottom-6 right-5 md:right-9 z-20"
//         startContent={<PlusIcon className="size-5 shrink-0" />}
//         onPress={onOpen}
//       >
//         New Post
//       </Button>
//
//       <Modal
//         isOpen={isOpen || true}
//         onOpenChange={onOpenChange}
//         isDismissable={false}
//         size="xl"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Neuer Post
//               </ModalHeader>
//
//               <ModalBody>
//                 <Form>
//                   <Divider />
//
//                   <ThumbnailInput />
//
//                   <Input
//                     label="Titel"
//                     name="title"
//                     id="title"
//                     className="mt-5"
//                     required
//                     minLength={5}
//                     maxLength={100}
//                   />
//
//                   <Textarea
//                     label="Inhalt"
//                     name="content"
//                     id="content"
//                     className="mt-5"
//                     minLength={10}
//                     required
//                   />
//
//                   <Divider className="mt-5" />
//
//                   <div className="w-full flex justify-end gap-4 py-5">
//                     <Button variant="flat" onPress={onClose}>
//                       Abbrechen
//                     </Button>
//                     <Button type="submit" color="primary">
//                       Posten
//                     </Button>
//                   </div>
//                 </Form>
//               </ModalBody>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }
