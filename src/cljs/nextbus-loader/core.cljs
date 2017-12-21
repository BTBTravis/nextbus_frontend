(ns nextbus-loader.core
  (:require [ajax.core :refer [GET]]
    [enfocus.core :as ef]
    [enfocus.events :as events]
    [enfocus.effects :as effects])
(:require-macros [enfocus.macros :as em]))

(.log js/console "Hello, Kelsey!")

(defn display-err [str]
  (ef/at js/document ["#errortxt"] (ef/content str))
)

(set! (.-onload js/window) (fn [] (display-err "TEST")))