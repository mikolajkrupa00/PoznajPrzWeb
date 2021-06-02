
import {useForm} from "react-hook-form";
import components from "./styles";
import Axios from "axios";
import {useState, useEffect} from "react";

const BlockUser = () => {
    const {register, handleSubmit} = useForm();
    const [blockedUsers,setBlockedUsers] = useState();
    const {BlockUserSubmit, BlockUserInput, BlockUserContainer, BlockedUsers, User, UserName, UserEmail, UnlockUserSubmit} = components;

    useEffect(() => {
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data));
    }, [])
    const getUnblockedUsers = () =>{
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data))
    }

    const blockUser = (data) =>{
        Axios.put(`/user/blockUser/${data.username}`).then(getUnblockedUsers);
    }
    const unblockUser = (username) =>{
        Axios.put(`/user/unblockUser/${username}`).then(getUnblockedUsers)
        
    }
    return ( 
        <>
            <BlockUserContainer>
                        <BlockUserInput type="text" {...register('username', {required:true})}/>
                        <BlockUserSubmit onClick={handleSubmit(data => blockUser(data))}>Zablokuj</BlockUserSubmit>
            </BlockUserContainer>
            <BlockedUsers>
                <h3>Zablokowani użytkownicy</h3>
                {blockedUsers && blockedUsers.map(user=>
                    <User key={`key${user.userid}`}>
                        <UserName>Nazwa użytkownika: {user.username}</UserName>
                        <UserEmail>Email: {user.email}</UserEmail>
                        <UnlockUserSubmit onClick={()=>unblockUser(user.username)}>Odblokuj użytkownika</UnlockUserSubmit>
                    </User>
                )}
            </BlockedUsers>
        </>
     )
}
 
export default BlockUser;