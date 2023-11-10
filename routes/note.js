const router = require("express").Router()
const {Note, validate, validateForUpdate} = require("../models/note")
const jwt = require("jsonwebtoken")
const {User} = require("../models/user");


async function getAllNotesForUser(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('Użytkownik nie został znaleziony.');
            return null;
        }

        const notes = await Note.find({userId: user._id}).sort({dateAdded: -1});
        if (!notes || notes.length === 0) {
            console.log('Nie znaleziono żadnych notatek.');
            return null;
        }

        console.log(notes);
        return notes;
    } catch (error) {
        console.error('Błąd podczas pobierania notatek:', error);
        return null;
    }
}

router.get('/all', async (req, res) => {
    try {
        const allNotes = await getAllNotesForUser(req.user._id);
        res.status(200).send(allNotes);
    } catch (err) {
        console.log(err);
    }
});

async function lastNoteForUser(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('Użytkownik nie został znaleziony.');
            return null;
        }

        const lastNote = await Note.findOne({userId: user._id}).sort({dateAdded: -1});
        if (!lastNote) {
            console.log('Nie znaleziono ostatniej notatki.');
            return null;
        }

        return {lastNote};
    } catch (error) {
        console.error(error);
        return null;
    }
}

router.get("/", async (req, res) => {
    try {
        const lastNote = await lastNoteForUser(req.user._id);
        res.status(200).send(lastNote.lastNote);
    } catch (err) {
        console.log(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const {error} = validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).send({message: error})
        }

        const {title, content, priority} = req.body;
        const date = Date.now()
        const newNote = new Note({
            title,
            content,
            priority,
            date,
            userId: req.user._id,
        });
        newNote.save()
            .then(savedNote => {
                User.findByIdAndUpdate(
                    req.user._id,
                    {$push: {notes: savedNote._id}},
                    {new: true}
                )
                    .then(() => {
                        res.status(201).json({message: 'Notatka została zapisana.'});
                    })
                    .catch(error => {
                        console.error('Błąd podczas aktualizacji notatek użytkownika:', error);
                        res.status(500).json({error: 'Wystąpił błąd przy zapisywaniu notatki.'});
                    });
            })
            .catch(error => {
                console.error('Błąd podczas zapisywania notatki:', error);
                res.status(500).json({error: 'Wystąpił błąd przy zapisywaniu notatki.'});
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal Server Error"})
    }
})

router.put("/:id", async (req, res) => {
    try {
        const {error} = validateForUpdate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).send({message: error})
        }

        const {id} = req.params;
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            {title, content},
            {new: true}
        )
            .then(() => {
                res.status(201).json({message: 'Notatka została zapisana.'});
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({error: 'Wystąpił błąd przy zapisywaniu notatki.'});
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal Server Error"})
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params;

        const deletedNote = await Note.findByIdAndRemove(
            id,
        )
            .then(() => {
                res.status(201).json({message: 'Notatka została usunięta.'});
            })
            .catch(error => {
                console.error('Błąd podczas usuwania notatek:', error);
                res.status(500).json({error: 'Wystąpił błąd przy usuwaniu notatki.'});
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Internal Server Error"})
    }
})
module.exports = router