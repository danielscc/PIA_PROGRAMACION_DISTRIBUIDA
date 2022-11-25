using Microsoft.AspNetCore.Mvc;
using Models;
using BLL;

namespace CRUDReact.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {

        private readonly string Cadena;

        public UsuarioController(IConfiguration Config)
        {
            Cadena = Config.GetConnectionString("PROD");
        }


        [HttpGet]
        [Route("LoginId")]
        public IActionResult ListaId([FromBody] clsUsuario Usuario)
        {
            List<USUARIO> lstUsuario = BLL_Usuario.LoginId(Cadena, Usuario);

            Dictionary<string, int> IdUsuario = new Dictionary<string, int>();
            IdUsuario.Add("IdUsuario", lstUsuario[0].IdUsuario);

            if (lstUsuario.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, IdUsuario);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }

        [HttpGet]
        [Route("Lista")]
        public IActionResult Lista()
        {
            List<USUARIO> lstUsuario = BLL_Usuario.ExtraerTodo(Cadena);

            if (lstUsuario.Count > 0)
            {
                return StatusCode(StatusCodes.Status200OK, lstUsuario);
            }
            else
            {
                return StatusCode(StatusCodes.Status400BadRequest, null);
            }

        }


        [HttpPost]
        [Route("Guardar")]
        public IActionResult Guardar([FromBody] clsUsuario Usuario)
        {
            List<string> lstValidacion = BLL_Usuario.GuardarUsuario(Cadena, Usuario);

            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }

        }

        [HttpPut]
        [Route("Editar")]
        public IActionResult Editar([FromBody] USUARIO Usuario)
        {

            List<string> lstValidacion = BLL_Usuario.EditarUsuario(Cadena, Usuario);


            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }
        }


        [HttpPut]
        [Route("Eliminar")]
        public IActionResult Eliminar([FromBody] USUARIO Usuario)
        {

            List<string> lstValidacion = BLL_Usuario.EliminarUsuario(Cadena, Usuario);


            if (lstValidacion[0] == "00")
            {
                return StatusCode(StatusCodes.Status200OK, "ok");
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, null);
            }
        }

        /*NO LOGICO*/
        //[HttpDelete]
        //[Route("Eliminar/{id:int}")]
        //public IActionResult Eliminar(int id)
        //{

        //    List<string> lstValidacion = BLL_Usuario.EliminarUsuario(Cadena, id);


        //    if (lstValidacion[0] == "00")
        //    {
        //        return StatusCode(StatusCodes.Status200OK, "ok");
        //    }
        //    else
        //    {
        //        return StatusCode(StatusCodes.Status200OK, null);
        //    }
        //}

    }
}
