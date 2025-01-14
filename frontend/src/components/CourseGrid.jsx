import { Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";

const CourseGrid = ({ courses, setCourses }) => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const getCourses = async () => {
			try {
				const res = await fetch(BASE_URL + "/courses");
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error);
				}
				setCourses(data);
			} catch (error) {
				console.error("Failed to fetch courses: ", error);
			} finally {
				setIsLoading(false);
			}
		};
		getCourses();
	}, [setCourses]);

	console.log(courses);
	return (
		<>
			<Grid
				templateColumns={{
					base: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
				}}
				gap={4}
			>
				{courses && courses.map((course) => (
					<CourseCard key={course.id} course={course} setCourses={setCourses} />
				))}
			</Grid>

			{isLoading && (
				<Flex justifyContent={"center"}>
					<Spinner size={"xl"} />
				</Flex>
			)}
			{!isLoading && courses.length === 0 && ( //courses &&
				<Flex justifyContent={"center"}>
					<Text fontSize={"xl"}>
						<Text as={"span"} fontSize={"2xl"} fontWeight={"bold"} mr={2}>
							Keep track of your courses
							
						</Text>
						No course found.
					</Text>
				</Flex>
			)}
		</>
	);
};
export default CourseGrid;
