import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Radio,
	RadioGroup,
	Textarea,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateCollectionModal = ({ setdata }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isLoading, setIsLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		professor: "",
		description: "",
		gender: "",
	});
	const toast = useToast();

	const handleCreateCourse = async (e) => {
		e.preventDefault(); // prevent page refresh
		setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/Courses", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}

			toast({
				status: "success",
				title: "Yayy! 🎉",
				description: "Data created successfully.",
				duration: 2000,
				position: "top-center",
			});
			onClose();
			setdata((prevCourses) => [...prevdata, data]);

			setInputs({
				name: "",
				professor: "",
				description: "",
				gender: "",
			}); // clear inputs
		} catch (error) {
			toast({
				status: "error",
				title: "An error occurred.",
				description: error.message,
				duration: 4000,
			});
		} finally {
			setIsLoading(false);
			setInputs({
				name: "",
				professor: "",
				description: "",
				gender: "",
			}); // clear inputs
			
		}
	};

	return (
		<>
			<Button onClick={onOpen}>
				<BiAddToQueue size={20} />
			</Button>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<form onSubmit={handleCreateCourse}>
					<ModalContent>
						<ModalHeader> Enter Course Details! </ModalHeader>
						<ModalCloseButton />

						<ModalBody pb={6}>
							<Flex alignItems={"center"} gap={4}>
								{/* Left */}
								<FormControl>
									<FormLabel>Course_ame</FormLabel>
									<Input
										placeholder='example'
										value={inputs.name}
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
									/>
								</FormControl>

								{/* Right */}
								<FormControl>
									<FormLabel>Professor</FormLabel>
									<Input
										placeholder='Dr. John Doe'
										value={inputs.professor}
										onChange={(e) => setInputs({ ...inputs, professor: e.target.value })}
									/>
								</FormControl>
							</Flex>

							<FormControl mt={4}>
								<FormLabel>Description</FormLabel>
								<Textarea
									resize={"none"}
									overflowY={"hidden"}
									placeholder="Class focused on designing cloud solutions for enterprises"
									value={inputs.description}
									onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
								/>
							</FormControl>

							<RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio
										value='Pass'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Pass
									</Radio>
									<Radio
										value='Fail'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Fail
									</Radio>
								</Flex>
							</RadioGroup>
						</ModalBody>

						<ModalFooter>
							<Button colorScheme='blue' mr={3} type='submit' isLoading={isLoading}>
								Add
							</Button>
							<Button onClick={onClose}>Cancel</Button>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};
export default CreateCollectionModal;
