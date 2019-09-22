// Some setup used by both reading and writing
var dir = mp.utils.split_path(mp.get_script_file())[0]
var restore_bat_path = mp.utils.join_path(dir, "restore_window_rect.bat")
var save_bat_path = mp.utils.join_path(dir, "save_window_rect.bat")
var pid = mp.utils.getpid()

// Read last window rect if present
function load_rect() {
    var result = mp.utils.subprocess({ args: [restore_bat_path, pid], cancellable: false })
    dump(result)
}
mp.register_event("start-file", load_rect)
load_rect()

// Write the window rect on shutdown
function save_rect() {
    var result = mp.utils.subprocess({ args: [save_bat_path, pid], cancellable: false })
    dump(result)
}
mp.register_event("shutdown", save_rect)
mp.register_event("end-file", save_rect)
