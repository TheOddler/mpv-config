// Some setup used by both reading and writing
var dir = mp.utils.split_path(mp.get_script_file())[0]
var file_path = mp.utils.join_path(dir, "last_window_rect.txt")
var pid = mp.utils.getpid()

function run_script(name, args)
{
    var ps1_script = mp.utils.join_path(dir, name)
    var args_base = ["powershell", "&(\"" + ps1_script + "\")"]
    var result = mp.utils.subprocess({args: args_base.concat(args), cancellable: false})
    return result.stdout
}

// Read last window rect if present
function load_rect()
{
    try
    {
        var rect_json = mp.utils.read_file(file_path)
        var rect = JSON.parse(rect_json)
        run_script("Set-Window-Rect.ps1", [
                pid,
                rect.Left, // x
                rect.Top, // y
                rect.Right - rect.Left, // width
                rect.Bottom - rect.Top // height
            ])

        // var width = rect.Right - rect.Left
        // var height = rect.Bottom - rect.Top
        // mp.set_property("screen", 0)
        // mp.set_property("geometry", width + "x" + height + "+" + rect.Left + "+" + rect.Top)
    }
    catch (e)
    {
        dump(e)
    }
}
mp.register_event("start-file", load_rect)

// Write the window rect on shutdown
function save_rect() {
    var rect_json = run_script("Get-Window-Rect.ps1", [pid])
    mp.utils.write_file("file://" + file_path, rect_json)
}
mp.register_event("shutdown", save_rect)
mp.register_event("end-file", save_rect)
