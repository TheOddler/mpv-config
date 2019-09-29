// Some setup used by both reading and writing
var dir = mp.utils.split_path(mp.get_script_file())[0]
var rect_path = mp.utils.join_path(dir, "last_window_rect.txt")

// Read last window rect if present
try {
    var rect = mp.utils.read_file(rect_path).trim().split(' ')

    var x = rect[0]
    var y = rect[1]
    var width = rect[2]
    var height = rect[3]
    mp.set_property("screen", 0)
    mp.set_property("geometry", width + "x" + height + "+" + x + "+" + y)
}
catch (e) {
    dump(e)
}

// Save the rect at shutdown
function save_rect() {
    var ps1_script = mp.utils.join_path(dir, "Get-Client-Rect.ps1")
    var output = mp.utils.subprocess({ args: ["powershell", "&(\"" + ps1_script + "\")", mp.utils.getpid()], cancellable: false }).stdout
    mp.utils.write_file("file://" + rect_path, output)
}
mp.register_event("shutdown", save_rect)
