import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    let a = useContext(noteContext);
    useEffect(() => {
        a.update();
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            This is About {a.state.name} of sem {a.state.sem}
        </div>
    );
}

export default About
