import { StyledMain, StyledMainSection, StyledRigthSection } from "./styles";
import MainLeftSection from "../MainLeftSection";
import FeedNewPublicate from "../FeedNewPublicate";
import FeedCommentLike from "../FeedCommentLike";
import ChatComplete from "../ChatComplete";

import { IGetFeed } from "../../interfaces/DataForFeed";
import { fetchFeed } from "../../services/feed";
import formatTime from "../../utils/formatTime";

//------ Using context ------
import { useContext, useEffect, useState } from "react";
import DataUserForHeader from "../contexts/DataUserForHeader";

async function createComponentsFeed(): Promise<JSX.Element[]> {
    const data = await fetchFeed();

    return data.map((feed: IGetFeed) => (
        <FeedCommentLike
            src={
                feed.author.pathImage !== undefined
                    ? "https://api.socialtorcedor.shop/assets/" +
                      feed.author.pathImage
                    : "https://api.socialtorcedor.shop/assets/user_default.jpg"
            }
            user_name={feed.author.name}
            time_publication={formatTime(
                new Date(`${feed.createdAt}`)
            ).toString()}
            comment_post={feed.content}
            img_post={feed.pathImage}
            comments={feed.comments}
            likes={`${feed.likes ? feed.likes.length : 0}`}
        />
    ));
}

export default function Main(): JSX.Element {
    const { logo } = useContext(DataUserForHeader);
    const [components, setComponents] = useState<JSX.Element[]>([]);

    useEffect(() => {
        async function fetchAndSetComponents() {
            const newComponents = await createComponentsFeed();
            setComponents(newComponents);
        }

        fetchAndSetComponents();
    }, []);

    const props_new_publication = {
        place_hoder: "Adicione um feed aqui!",
        src: `${logo}`,
        alt: "Image de perfil",
        action: "Publicar",
        image: true,
    };

    return (
        <StyledMain>
            <MainLeftSection />

            <StyledMainSection>
                <FeedNewPublicate {...props_new_publication} />
                {components}
            </StyledMainSection>

            <StyledRigthSection>
                <ChatComplete groupId="6418bb1735e3cacb1250b402" />
            </StyledRigthSection>
        </StyledMain>
    );
}
