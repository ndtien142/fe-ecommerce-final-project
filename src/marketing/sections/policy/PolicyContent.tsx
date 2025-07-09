import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Card, CardContent } from '@mui/material';
//
import { MotionViewport, varFade } from '../../../common/components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
}));

const CardStyle = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

export default function PolicyContent() {
  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <m.div variants={varFade().inUp}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              Chính sách bảo mật & Điều khoản dịch vụ
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500' }}>
              Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}
            </Typography>
          </m.div>
        </Box>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Chính sách bảo mật
              </Typography>
              <Typography variant="body1" paragraph>
                FPT Furniture tôn trọng quyền riêng tư và cam kết bảo vệ thông tin cá nhân của bạn.
                Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu
                của bạn khi bạn truy cập cửa hàng nội thất hoặc mua hàng.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Thông tin chúng tôi thu thập:
              </Typography>
              <Typography variant="body1" paragraph>
                • Thông tin cá nhân (tên, email, số điện thoại, địa chỉ) khi bạn tạo tài khoản hoặc
                mua hàng
                <br />
                • Thông tin thanh toán (được xử lý an toàn thông qua đối tác thanh toán)
                <br />
                • Dữ liệu sử dụng website và cookie để cải thiện trải nghiệm mua sắm
                <br />• Sở thích liên lạc và tương tác dịch vụ khách hàng
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Cách chúng tôi sử dụng thông tin:
              </Typography>
              <Typography variant="body1" paragraph>
                • Xử lý và thực hiện đơn hàng nội thất của bạn
                <br />
                • Cung cấp hỗ trợ khách hàng và phản hồi thắc mắc
                <br />
                • Gửi cập nhật đơn hàng và thông báo giao hàng
                <br />
                • Cải thiện website và dịch vụ dựa trên phản hồi của bạn
                <br />• Gửi ưu đãi khuyến mãi (chỉ khi có sự đồng ý của bạn)
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Điều khoản dịch vụ
              </Typography>
              <Typography variant="body1" paragraph>
                Bằng cách sử dụng website và dịch vụ của FPT Furniture, bạn đồng ý tuân thủ và bị
                ràng buộc bởi các điều khoản và điều kiện sau.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Trách nhiệm tài khoản:
              </Typography>
              <Typography variant="body1" paragraph>
                • Bạn phải cung cấp thông tin chính xác và đầy đủ khi tạo tài khoản
                <br />
                • Bạn có trách nhiệm bảo mật thông tin đăng nhập tài khoản
                <br />• Bạn phải thông báo ngay cho chúng tôi về việc sử dụng tài khoản trái phép
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Điều khoản đặt hàng:
              </Typography>
              <Typography variant="body1" paragraph>
                • Tất cả giá cả có thể thay đổi mà không cần báo trước
                <br />
                • Đơn hàng phụ thuộc vào tình trạng có hàng và được chấp nhận
                <br />
                • Chúng tôi có quyền từ chối hoặc hủy đơn hàng theo quyết định của mình
                <br />• Thời gian giao hàng là ước tính và có thể thay đổi tùy theo địa điểm và tình
                trạng sản phẩm
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Chính sách đổi trả & trao đổi
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi muốn bạn hoàn toàn hài lòng với việc mua nội thất. Chính sách đổi trả và
                trao đổi được thiết kế để đảm bảo sự an tâm cho bạn.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Thời gian đổi trả:
              </Typography>
              <Typography variant="body1" paragraph>
                • 30 ngày kể từ ngày giao hàng cho hầu hết sản phẩm nội thất
                <br />
                • 14 ngày cho nội thất tùy chỉnh hoặc cá nhân hóa
                <br />• 7 ngày cho sản phẩm thanh lý hoặc khuyến mãi
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Điều kiện đổi trả:
              </Typography>
              <Typography variant="body1" paragraph>
                • Sản phẩm phải trong tình trạng nguyên vẹn với đầy đủ bao bì
                <br />
                • Sản phẩm tùy chỉnh hoặc cá nhân hóa không thể đổi trả trừ khi bị lỗi
                <br />
                • Khách hàng chịu trách nhiệm chi phí vận chuyển đổi trả trừ khi sản phẩm bị lỗi
                <br />• Tiền hoàn lại sẽ được xử lý trong 5-7 ngày làm việc sau khi nhận được sản
                phẩm trả lại
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Chính sách vận chuyển & giao hàng
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi cố gắng giao nội thất một cách an toàn và đúng thời gian. Đây là những
                điều bạn cần biết về quy trình vận chuyển và giao hàng.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Tùy chọn giao hàng:
              </Typography>
              <Typography variant="body1" paragraph>
                • Giao hàng tiêu chuẩn: 7-14 ngày làm việc
                <br />
                • Giao hàng cao cấp: Lắp đặt chuyên nghiệp và thu hồi nội thất cũ
                <br />
                • Giao hàng nhanh: 2-5 ngày làm việc cho một số sản phẩm được chọn
                <br />• Nhận hàng tại địa điểm: Có sẵn tại các showroom của chúng tôi
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Quy trình giao hàng:
              </Typography>
              <Typography variant="body1" paragraph>
                • Chúng tôi sẽ liên hệ để sắp xếp giao hàng khi đơn hàng sẵn sàng
                <br />
                • Phải có người hiện diện trong quá trình giao hàng để kiểm tra và nhận hàng
                <br />
                • Vui lòng kiểm tra tất cả sản phẩm về thiệt hại trước khi ký nhận
                <br />• Báo cáo bất kỳ thiệt hại hoặc vấn đề nào trong vòng 48 giờ sau khi giao hàng
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <CardStyle>
            <CardContent>
              <Typography variant="h4" sx={{ mb: 3, color: 'primary.main' }}>
                Bảo hành & chăm sóc
              </Typography>
              <Typography variant="body1" paragraph>
                Chúng tôi đứng sau chất lượng nội thất và cung cấp bảo hành toàn diện để bạn yên
                tâm.
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Phạm vi bảo hành:
              </Typography>
              <Typography variant="body1" paragraph>
                • Bảo hành 1 năm cho tất cả khung nội thất và cơ cấu
                <br />
                • Bảo hành 6 tháng cho vải và bọc da
                <br />
                • Bảo hành 2 năm cho nệm và đệm
                <br />• Bảo hành trọn đời cho cấu trúc gỗ tự nhiên
              </Typography>
              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Hướng dẫn chăm sóc:
              </Typography>
              <Typography variant="body1" paragraph>
                • Tuân theo hướng dẫn chăm sóc được cung cấp với mỗi sản phẩm
                <br />
                • Sử dụng sản phẩm tẩy rửa phù hợp cho từng chất liệu
                <br />
                • Tránh ánh nắng trực tiếp và độ ẩm quá mức
                <br />• Khuyến khích vệ sinh chuyên nghiệp cho vải tinh tế
              </Typography>
            </CardContent>
          </CardStyle>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Box sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Có thắc mắc về chính sách của chúng tôi?
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.500' }}>
              Liên hệ đội ngũ chăm sóc khách hàng tại support@fptfurniture.com hoặc gọi 1800-1234
            </Typography>
          </Box>
        </m.div>
      </Container>
    </RootStyle>
  );
}
