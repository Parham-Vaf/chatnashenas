<?php
session_start();
require_once '../config/database.php';
require_once '../includes/functions.php';

if(!isset($_SESSION['user_id'])) {
    header('Location: ../auth/login.php');
    exit();
}

$user_id = $_SESSION['user_id'];

// دریافت اطلاعات کاربر
$sql = "SELECT * FROM users WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id]);
$user = $stmt->fetch();

// آپلود عکس پروفایل
if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['profile_image'])) {
    $upload_result = uploadProfileImage($_FILES['profile_image'], $user_id);
    
    if($upload_result['success']) {
        $sql = "UPDATE users SET profile_image = ? WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$upload_result['filename'], $user_id]);
        $success = "عکس پروفایل با موفقیت آپلود شد.";
    } else {
        $error = $upload_result['message'];
    }
}
?>
<?php include '../includes/header.php'; ?>

<div class="container">
    <h2>پروفایل کاربری</h2>
    
    <?php if(isset($success)): ?>
        <div class="success"><?php echo $success; ?></div>
    <?php endif; ?>
    
    <?php if(isset($error)): ?>
        <div class="error"><?php echo $error; ?></div>
    <?php endif; ?>
    
    <div class="profile-info">
        <p><strong>نام کاربری:</strong> <?php echo $user['username']; ?></p>
        <p><strong>ایمیل:</strong> <?php echo $user['email']; ?></p>
        
        <?php if($user['profile_image']): ?>
            <img src="../uploads/profiles/<?php echo $user['profile_image']; ?>" alt="عکس پروفایل" width="200">
        <?php endif; ?>
    </div>
    
    <h3>آپلود عکس پروفایل</h3>
    <form method="POST" action="" enctype="multipart/form-data">
        <div class="form-group">
            <label>انتخاب عکس:</label>
            <input type="file" name="profile_image" accept="image/*" required>
        </div>
        <button type="submit">آپلود</button>
    </form>
    
    <h3>لینک دریافت پیام ناشناس</h3>
    <p>این لینک رو به دوستات بده تا برات پیام ناشناس بفرستن:</p>
    <input type="text" value="http://yoursite.com/messages/send.php?to=<?php echo $user['username']; ?>" readonly>
</div>

<?php include '../includes/footer.php'; ?>