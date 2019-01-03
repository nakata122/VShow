import React from 'react'

const LeaderboardItem = ({name,index}) => (
    <div>{index+1}. {name}</div>
);

export default LeaderboardItem;