//styles
import React from 'react';
import { Container, MainBox, StyledLogo, ItemsBox } from "./Sidebar.styles";
import { Chip, Box } from '@mui/material';

//icons
import { FaTrash, FaArchive, FaLightbulb, FaTag } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

//redux
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleTagsModal } from "../../features";

//others
import { v4 } from "uuid";
import { NavLink, useLocation } from "react-router-dom";
import getStandardName from "../../utils/getStandardName";
import useOutsideClick from "../../components/MainWrapper/MainWrapper";

//sidebar items
const items = [
  { icon: <FaArchive />, title: "Archive", id: v4() },
  { icon: <FaTrash />, title: "Trash", id: v4() },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.menu);
  const { tagsList } = useSelector((state) => state.tags);

  //getting path
  const location = useLocation();
  const { pathname } = location;

  //custom hook for closing menu
  const nodeRef = useOutsideClick(() => dispatch(toggleMenu(false)));

  //not displaying sidebar in the following paths
  if (pathname === "/" || pathname === "/404") {
    return null;
  }

  return (
    <Container openMenu={isOpen && "open"}>
      <MainBox openMenu={isOpen && "open"} ref={nodeRef}>
        <StyledLogo>
          {/* <img src={images.whiteLogo} alt="" /> */}
          <span>Notes</span>
        </StyledLogo>

        <ItemsBox>
          {/* note item */}
          <Box onClick={() => dispatch(toggleMenu(false))}>
            <NavLink
              to={`/notes`}
              state={`notes`}
              className={({ isActive }) =>
                isActive ? "active-item" : "inactive-item"
              }
              style={{ textDecoration: 'none' }}
            >
              <Chip
                icon={<FaLightbulb />}
                label="Notes"
                clickable
                sx={{
                  color: "#176087",
                  '& .MuiChip-icon': { color: "#176087" },
                  '&:hover': { color: "#FFD500" },
                }}
              />
            </NavLink>
          </Box>

          {/*tags item */}
          {tagsList?.map(({ tag, id }) => (
            <Box key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/tag/${tag}`}
                state={`${tag}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
                style={{ textDecoration: 'none' }}
              >
                <Chip
                  icon={<FaTag />}
                  label={getStandardName(tag)}
                  clickable
                  sx={{
                    color: "#176087",
                    '& .MuiChip-icon': { color: "#176087" },
                    '&:hover': { color: "#FFD500" },
                  }}
                />
              </NavLink>
            </Box>
          ))}

          {/* edit tag item */}
          <Box
            className="sidebar__edit-item"
            onClick={() =>
              dispatch(toggleTagsModal({ type: "edit", view: true }))
            }
          >
            <Chip
              icon={<MdEdit />}
              label="Edit Notes"
              clickable
              sx={{
                color: "#176087",
                '& .MuiChip-icon': { color: "#176087" },
                '&:hover': { color: "#FFD500" },
              }}
            />
          </Box>

          {/* other items */}
          {items.map(({ icon, title, id }) => (
            <Box key={id} onClick={() => dispatch(toggleMenu(false))}>
              <NavLink
                to={`/${title.toLowerCase()}`}
                state={`${title}`}
                className={({ isActive }) =>
                  isActive ? "active-item" : "inactive-item"
                }
                style={{ textDecoration: 'none' }}
              >
                <Chip
                  icon={icon}
                  label={title}
                  clickable
                  sx={{
                    color: "#176087",
                    '& .MuiChip-icon': { color: "#176087" },
                    '&:hover': { color: "#FFD500" },
                  }}
                />
              </NavLink>
            </Box>
          ))}
        </ItemsBox>
      </MainBox>
    </Container>
  );
};

export default Sidebar;
