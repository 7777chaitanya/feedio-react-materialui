import React from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useStyles from "./styles.js";
import { Box, Typography, useTheme } from '@material-ui/core';

const Post = ({handleLike, like, wassupText, likesCount}) => {
    const classes = useStyles();
    const theme = useTheme();
    console.log(theme)
    return (
       <Box className={classes.outerBox}>
           <Box >
                <Typography variant="h6" className={classes.username}>You</Typography>
           </Box>
           <Box>
               <Typography>{wassupText}</Typography>
           </Box>
           <Box>
               <Box className={classes.iconColor}>  

                   {!like ? <FavoriteBorderIcon onClick={handleLike}/> : <FavoriteIcon onClick={handleLike}/>}
                </Box>
               <Box >
                   {likesCount} Likes
               </Box>
             
           </Box>
       </Box>
    )
}

export default Post
