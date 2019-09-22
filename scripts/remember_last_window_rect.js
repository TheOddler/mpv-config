// Some setup used by both reading and writing
var dir = mp.utils.split_path(mp.get_script_file())[0]
var rect_path = mp.utils.join_path(dir, "last_window_rect.txt")

// Read last window rect if present
try {
    var rect_json = mp.utils.read_file(rect_path)
    var rect = JSON.parse(rect_json)

    var width = rect.Right - rect.Left
    var height = rect.Bottom - rect.Top
    mp.set_property("screen", 0)
    mp.set_property("geometry", width + "x" + height + "+" + rect.Left + "+" + rect.Top)
}
catch (e) {
    dump(e)
}

// Save the rect at shutdown
function save_rect() {
    var ps1_script = mp.utils.join_path(dir, "Get-Client-Rect.ps1")
    var rect_json = mp.utils.subprocess({ args: ["powershell", "&(\"" + ps1_script + "\")", mp.utils.getpid()], cancellable: false }).stdout
    mp.utils.write_file("file://" + rect_path, rect_json)
}
mp.register_event("shutdown", save_rect)
