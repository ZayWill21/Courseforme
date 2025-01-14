import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text, useToast } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const CourseCard = ({ course, setCourses }) => {
	const toast = useToast();
	const handleDeleteCourse = async () => {
		try {
			const res = await fetch(BASE_URL + "/courses/" + course.id, {
				method: "DELETE",
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			setCourses((prevCourses) => prevCourses.filter((u) => u.id !== course.id));
			toast({
				status: "success",
				title: "Success",
				description: "course deleted successfully.",
				duration: 2000,
				position: "top-center",
			});
		} catch (error) {
			toast({
				title: "An error occurred",
				description: error.message,
				status: "error",
				duration: 4000,
				isClosable: true,
				position: "top-center",
			});
		}
	};
	return (
		<Card>
			<CardHeader>
				<Flex gap={4}>
					<Flex flex={"1"} gap={"4"} alignItems={"center"}>
						<Avatar src={course.imgUrl} />

						<Box>
							<Heading size='sm'>{course.name}</Heading>
							<Text>{course.role}</Text>
						</Box>
					</Flex>

					<Flex>
						<EditModal course={course} setCourses={setCourses} />
						<IconButton
							variant='ghost'
							colorScheme='red'
							size={"sm"}
							aria-label='See menu'
							icon={<BiTrash size={20} />}
							onClick={handleDeleteCourse}
						/>
					</Flex>
				</Flex>
			</CardHeader>

			<CardBody>
				<Text>{course.description}</Text>
			</CardBody>
		</Card>
	);
};
export default CourseCard;
