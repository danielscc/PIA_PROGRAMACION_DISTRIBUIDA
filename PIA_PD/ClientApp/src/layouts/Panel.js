import TablaBitacora from '../components/TablaBitacora';
import TablaMovimiento from '../components/TablaMovimientos';
import TablaUsuarios from '../components/TablaUsuarios';
import {Routes, Route} from 'react-router-dom';
import NavMenu from '../partials/NavMenu';

export default function Panel(){
    return(
        <div>
            <NavMenu />
            <Routes>
                <Route path='usuarios' element={<TablaUsuarios />} />
                <Route path='bitacora' element={<TablaBitacora />} />
                <Route path='movimiento' element={<TablaMovimiento />} />
            </Routes>
        </div>
    );
}