
import {useForm} from "react-hook-form";
import components from "./styles";
import Axios from "axios";
import {useState, useEffect} from "react";

const BlockUser = () => {
    const {register, handleSubmit} = useForm();
    const [blockedUsers,setBlockedUsers] = useState();
    const [blockMessage, setBlockMessage] = useState("")
    const [messageStyle, setMessageStyle] = useState()
    const [unBlockMessage, setUnblockMassage] = useState("")
    const {BlockUserSubmit, BlockUserInput, BlockUserContainer, BlockedUsers, User, UserName, UserEmail, UnlockUserSubmit,
        UnblockMessageDiv, BlockMessageDiv} = components;

    const errorMessage = {color: 'firebrick'};
    const successMessage = {color: 'green'}

    useEffect(() => {
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data));
    }, [])
    const getUnblockedUsers = () =>{
        Axios.get("/user/blockedUsers").then(res => setBlockedUsers(res.data))
    }

    const blockUser = (data) =>{
        Axios.put(`/user/blockUser/${data.username}`).then((res)=>{
            if (res.status === 200 && res.data) {
                setBlockMessage('Użytkownik został zablokowany')
                setMessageStyle(successMessage)
            } 
            else {
                setBlockMessage('Użytkownik nie istnieje lub został już zablokowany')
                setMessageStyle(errorMessage)
            }

            setTimeout(()=>{ setBlockMessage('') }, 3500)           

        }).catch(() => {
            setBlockMessage('Użytkownik nie istnieje lub został już zablokowany')
            setMessageStyle(errorMessage)
            setTimeout(()=>{ setBlockMessage('') }, 3500)
        }).then(getUnblockedUsers);
    }
    const unblockUser = (username) =>{
        Axios.put(`/user/unblockUser/${username}`).then(getUnblockedUsers)
        setUnblockMassage(`Użytkownik ${username} został odblokowany`);
        setTimeout(()=>{ setUnblockMassage('') }, 3500)        
    }
    return ( 
        <>
            <BlockUserContainer>
                        <BlockUserInput type="text" {...register('username', {required:true})}/>
                        <BlockUserSubmit onClick={handleSubmit(data => blockUser(data))}>Zablokuj</BlockUserSubmit>
                        <BlockMessageDiv style={messageStyle}>{blockMessage}</BlockMessageDiv>                
            </BlockUserContainer>

            <BlockedUsers>
                <h3>Zablokowani użytkownicy</h3>
                <UnblockMessageDiv style={successMessage}>{unBlockMessage}</UnblockMessageDiv>
                
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