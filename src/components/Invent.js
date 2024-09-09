import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function Invent(){
    const [count, setCount] = useState(0);
    const invent = useSelector((state) => state.inventSlice.value)
    useEffect(() => {
        window.addEventListener("wheel", (event) => {
            if(event.wheelDelta > 0){
                setCount(count=>count - 1)
                if(count <= -invent.length - 1){
                    setCount(0)
                }
            }else {
                setCount(count=>count + 1)
                if(count >= invent.length - 1){
                    setCount(0)
                }
            }



        });
    }, [count]);
    return <>
        <div className={"invent"}>
            {count}
            <table>
                <tbody>
                <tr>{invent.map((el, i) => <td className={count === i?"active":""} key={i + "invent"}>{el.name}</td>)}</tr>
                </tbody>
            </table>
        </div>
    </>
}