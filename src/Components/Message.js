import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Avatar, Box, Chip, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function Message(props) {
  return (
    <div>
      <Box
        sx={{
          my: 2,
          display: "flex",
          flexFlow: "row",
          justifyContent: props.isCustomer ? "right" : "left",
          flexDirection: props.isCustomer ? "row-reverse" : "row",
        }}
      >
         <Avatar sx={{ mr: 1, bgcolor: props.isCustomer ? "#176087" : "#FFD500", width: '32', mt: 1.5, mx: 2  }}>
                {props.isCustomer ? <PersonIcon /> : <SmartToyIcon />}
          </Avatar>
        <Box>
          <Typography gutterBottom variant="body2"
            sx={{
              mt: 1.5,
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '8px',
            }}>
            {props.content}
          </Typography>
          {props.image && (
            <img src={props.image} alt="Bot response" style={{ width: "100%" }} />
          )}
          {!props.isCustomer && props.choices && (
            <Box sx={{ mt: 1 }}>
              {props.choices.map((choice, index) => (
                <Chip
                  key={index}
                  label={choice}
                  onClick={() => props.handleChoice(choice)}
                  sx={{ mr: 0.5, mb: 0.5 }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}