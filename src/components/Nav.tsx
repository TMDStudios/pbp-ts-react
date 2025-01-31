import { ReactElement } from "react";

type NavProps = { 
    currentApp: number,
    setCurrentApp: React.Dispatch<React.SetStateAction<number>>
}

enum Apps {
    'Main Menu' = 0,
    'Numbers Game' = 1,
    'Calculator' = 2,
    'Guess The Phrase' = 3,
    'Username And Password' = 4
}

const Nav = ({currentApp, setCurrentApp}: NavProps): ReactElement => {
    const switchApp = (appNum: number) => {
        if(confirm("Are you sure?\nYou will lose all progress.")) setCurrentApp(appNum);
    };
    
    return (
        <>
            <div>
                <h2>PBP TypeScript React</h2>
            </div>
            <div className="navBar">
                <button onClick={() => switchApp(Apps['Main Menu'])}>{Apps[0]}</button>
                <button onClick={() => switchApp(Apps['Numbers Game'])}>{Apps[1]}</button>
                <button onClick={() => switchApp(Apps['Calculator'])}>{Apps[2]}</button>
                <button onClick={() => switchApp(Apps['Guess The Phrase'])}>{Apps[3]}</button>
                <button onClick={() => switchApp(Apps['Username And Password'])}>{Apps[4]}</button>
            </div>
        </>
    )
}
export default Nav;