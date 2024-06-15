import { GetUserDataProps } from "./GetUserData.types";

export function GetUserData(props: GetUserDataProps) {
  return (
    <div>
      <h2>Contributions for {props.username}</h2>
    </div>
  );
}

// const getUserData: React.FC<getUserDataProps> = (props) => {
//     return (
//         <div>
//           <h2>Contributions for {props.userName}</h2>
//         </div>
//       );
// }

// export default getUserData;
