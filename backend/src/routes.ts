import express from "express"
import { CreateDevController } from "./useCases/Desenvolvedores/Create/CreateDevController";
import { DeleteDevController } from "./useCases/Desenvolvedores/Delete/DeleteDevController";
import { GetDevController } from "./useCases/Desenvolvedores/Get/GetDevController";
import { UpdateDevController } from "./useCases/Desenvolvedores/Update/UpdateDevController";
import { CreateNivelController } from "./useCases/Niveis/Create/CreateNivelController";
import { DeleteNivelController } from "./useCases/Niveis/Delete/DeleteNivelController";
import { GetNivelController } from "./useCases/Niveis/Get/GetNivelController";
import { UpdateNivelController } from "./useCases/Niveis/Update/UpdateNivelController";

const router = express.Router();

const getDevControler = new GetDevController();
const createDevControler = new CreateDevController();
const updateDevControler = new UpdateDevController();
const deleteDevControler = new DeleteDevController();

const getNivelController = new GetNivelController();
const createNivelControler = new CreateNivelController();
const updateNivelControler = new UpdateNivelController();
const deleteNivelControler = new DeleteNivelController();

router.get("/dev", getDevControler.handle);
router.post("/dev", createDevControler.handle);
router.put("/dev/:id", updateDevControler.handle);
router.delete("/dev/:id", deleteDevControler.handle);

router.get("/nivel", getNivelController.handle);
router.post("/nivel", createNivelControler.handle);
router.put("/nivel/:id", updateNivelControler.handle);
router.delete("/nivel/:id", deleteNivelControler.handle);

export { router };