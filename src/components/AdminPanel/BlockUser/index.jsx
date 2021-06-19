
import {useForm} from "react-hook-form";
import components from "./styles";
import Axios from "axios";
import {useState, useEffect} from "react";

const BlockUser = () => {
    const {register, handleSubmit} = useForm();
    const [blockedUsers,setBlockedUsers] = useState();
    const [blockError, setBlockError] = useState("")
    const [unBlockMessage, setUnblockMassage] = useState("")
    const {BlockUserSubmit, BlockUserInput, BlockUserContainer, BlockedUsers, User, UserName, UserEmail, UnlockUserSubmit} = components;

    useEffect(() => {
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data));
    }, [])
    const getUnblockedUsers = () =>{
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data))
    }

    const blockUser = (data) =>{
        Axios.put(`/user/blockUser/${data.username}`).then((res)=>{
            if (res.status === 200 && res.data) {
                setBlockError(1)
            } 
            else {
                setBlockError(2)
            }
        }).catch(() => {
            setBlockError(2)
        }).then(getUnblockedUsers);
    }
    const unblockUser = (username) =>{
        Axios.put(`/user/unblockUser/${username}`).then(getUnblockedUsers)
        setUnblockMassage(`Użytkownik ${username} został odblokowany`);
    }
    return ( 
        <>
            <BlockUserContainer>
                        <BlockUserInput type="text" {...register('username', {required:true})}/>
                        <BlockUserSubmit onClick={handleSubmit(data => blockUser(data))}>Zablokuj</BlockUserSubmit>
                        {blockError===1 ? <p style={{color:'green',paddingTop:'15px'}}>Użytkownik został zablokowany</p> : null}
                        {blockError===2 ? <p style={{color:'firebrick',paddingTop:'15px'}}>Użytkownik nie istnieje lub został już zablokowany</p> : null}
            </BlockUserContainer>
            <BlockedUsers>
                <h3>Zablokowani użytkownicy</h3>
                {unBlockMessage && <p style={{color:'green',paddingTop:'15px'}}>{unBlockMessage}</p>}
                {blockedUsers && blockedUsers.map(user=>
                    <User key={`key${user.userId}`}>
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