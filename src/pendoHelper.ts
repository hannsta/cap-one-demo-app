
import { useUser } from './components/UserContext';

export const InitPendo = () => {
    const { currentUser, userType } = useUser();
    
    if (!currentUser) return;
    
    //@ts-ignore
    window.pendo.initialize({
        visitor: {
            id: currentUser.id,
            role: userType || currentUser.role,
            name: currentUser.name,
            email: currentUser.email,
            employeeId: currentUser.employeeId,
            department: currentUser.department
        },
        account: {
            id: "CapitalOne",
        },
    });
};
