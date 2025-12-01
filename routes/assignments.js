const assignment = require('../model/assignment');
let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)


// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    Assignment.paginate({}, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10
    })
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        res.status(500).send(err);
    });
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({id: assignmentId}, (err, assignment) =>{
        if(err){res.send(err)}
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

    console.log("POST assignment reçu :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            res.send('cant post assignment ', err);
        }
        res.json({ message: `${assignment.nom} saved!`})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);
    Assignment.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, (err, assignment) => {
   
        if (err) {
            console.log(err);
            res.send(err)
        } else {
          res.json({message: 'updated'})
        }

      // console.log('updated ', assignment)
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findOneAndDelete({id: req.params.id}, (err, assignment) => {
        if (err) {
            console.log('❌ Erreur suppression:', err);
            res.status(500).send(err);
            return; // ✅ IMPORTANT : arrêter l'exécution
        }
        
        if (!assignment) {
            console.log('⚠️ Assignment non trouvé');
            res.status(404).json({message: 'Assignment not found'});
            return; // ✅ arrêter l'exécution
        }
        
        console.log('✅ Assignment supprimé:', assignment.nom);
        res.json({message: `${assignment.nom} deleted`});
    });
}


module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
