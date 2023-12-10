package handler

import "encoding/json"

func jsonError(msg string) []byte {

	error := struct {
		Error string `json:"message"`
	}{
		msg,
	}

	r, err := json.Marshal(error)
	if err != nil {
		return []byte(err.Error())
	}

	return r
}
