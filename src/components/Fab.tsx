import style from './Fab.module.css'

interface FabProps {
    add: () => void;
}

export default function FabNew(props: FabProps) {
    return (
        <div className={style.fab}>
            <button className={style.inner} onClick={props.add}>+</button>
        </div>
    );
}
