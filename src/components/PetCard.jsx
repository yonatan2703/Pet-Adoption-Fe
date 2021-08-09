import * as React from "react";

import { Link } from "react-router-dom";

import { Box, Image } from "@chakra-ui/react";

export default function PetCard(props) {
	const { pet, width, edit } = props;

	let link = `/pet-page/${pet.id}`;
	if (edit) link = `/edit-pet/${pet.id}`;

	return (
		<Box
			w={width}
			borderWidth="3px"
			borderRadius="lg"
			overflow="hidden"
			className="d-flex flex-column align-items-center pb-3 mt-3"
		>
			<Image src={pet.imageUrl} alt={pet.imageAlt} />
			<div className="h1 mb-3">{pet.name}</div>
			<div className="h4 mb-3">Adoption Status: {pet.adoptionStatus}</div>
			<div className="h3">Bio</div>
			<div className="h5 p-3 pt-0">{pet.bio}</div>
			<Link to={link} className="pet-card-link">
				{edit && "Edit "}Pet Page
			</Link>
		</Box>
	);
}
